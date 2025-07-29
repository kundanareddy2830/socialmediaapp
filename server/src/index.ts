import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import prisma from './prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Extend Express Request type to include 'user'
interface AuthRequest extends Request {
  user?: any;
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided.' });
  jwt.verify(token, process.env.JWT_SECRET || 'devsecret', (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
}

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  console.log('POST /api/auth/register called', req.body);
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username, and password are required.' });
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existingUser) {
      return res.status(409).json({ error: 'Email or username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword }
    });
    res.status(201).json({ id: user.id, email: user.email, username: user.username, createdAt: user.createdAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  console.log('POST /api/auth/login called', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// --- NOTIFICATIONS ENDPOINT ---
app.get('/api/notifications', authenticateToken, async (req: AuthRequest, res: Response) => {
  console.log('GET /api/notifications called by user', req.user.userId);
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      include: { post: true },
    });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

// --- POST ROUTES ---
app.post('/api/posts', authenticateToken, async (req: AuthRequest, res: Response) => {
  console.log('POST /api/posts called by user', req.user.userId, 'with content:', req.body.content);
  const { content } = req.body;
  const authorId = req.user.userId;
  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }
  try {
    const post = await prisma.post.create({
      data: {
        content,
        authorId: Number(authorId)
      }
    });
    // Notify all followers
    const followers = await prisma.follow.findMany({ where: { followingId: authorId } });
    await Promise.all(followers.map((f: any) =>
      prisma.notification.create({
        data: {
          userId: f.followerId,
          type: 'post',
          message: `New post from someone you follow!`,
          postId: post.id,
        }
      })
    
    
    ));
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post.' });
  }
});

app.get('/api/posts', async (req, res) => {
  console.log('GET /api/posts called');
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, username: true, email: true }
        }
      }
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
});

app.post('/api/posts/:id/comment', authenticateToken, async (req: AuthRequest, res: Response) => {
  console.log('POST /api/posts/' + req.params.id + '/comment called by user', req.user.userId, 'with content:', req.body.content);
  const { content } = req.body;
  const authorId = req.user.userId;
  const postId = Number(req.params.id);
  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: Number(authorId),
        postId
      }
    });
    // Notify post author
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post && post.authorId !== authorId) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: 'comment',
          message: `Someone commented on your post!`,
          postId: post.id,
        }
      });
    }
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment.' });
  }
});

app.post('/api/posts/:id/like', authenticateToken, async (req: AuthRequest, res: Response) => {
  console.log('POST /api/posts/' + req.params.id + '/like called by user', req.user.userId);
  const userId = req.user.userId;
  const postId = Number(req.params.id);
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: Number(userId),
          postId
        }
      }
    });
    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return res.json({ liked: false });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: Number(userId),
          postId
        }
      });
      // Notify post author
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (post && post.authorId !== userId) {
        await prisma.notification.create({
          data: {
            userId: post.authorId,
            type: 'like',
            message: `Someone liked your post!`,
            postId: post.id,
          }
        });
      }
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to like/unlike post.' });
  }
});

app.post('/api/users/:id/follow', authenticateToken, async (req: AuthRequest, res: Response) => {
  console.log('POST /api/users/' + req.params.id + '/follow called by user', req.user.userId);
  const followerId = req.user.userId;
  const followingId = Number(req.params.id);
  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: Number(followerId),
          followingId
        }
      }
    });
    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id }
      });
      return res.json({ following: false });
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: Number(followerId),
          followingId
        }
      });
      // Notify followed user
      if (followerId !== followingId) {
        await prisma.notification.create({
          data: {
            userId: followingId,
            type: 'follow',
            message: `Someone followed you!`,
          }
        });
      }
      return res.json({ following: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to follow/unfollow user.' });
  }
});

app.put('/api/users/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  console.log('PUT /api/users/' + req.params.id + ' called by user', req.user.userId, 'with data:', req.body);
  const { id } = req.params;
  const { name, bio, avatar } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, bio, avatar },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        followers: true,
        following: true,
        posts: true
      }
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

app.get('/api/users/:username', async (req, res) => {
  console.log('GET /api/users/' + req.params.username + ' called');
  const { username } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        posts: true,
        followers: true,
        following: true
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({
      ...user,
      followersCount: user.followers.length,
      followingCount: user.following.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

app.get('/api/users/id/:id', async (req, res) => {
  console.log('GET /api/users/id/' + req.params.id + ' called');
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        posts: true,
        followers: true,
        following: true
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({
      ...user,
      followersCount: user.followers.length,
      followingCount: user.following.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user profile by ID.' });
  }
});

app.get('/', (req, res) => {
  res.send('SocialSpace backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 