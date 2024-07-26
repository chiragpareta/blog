import BlogPost from '../../model/blogPost';

import connectToDatabase from '@/utils/mongodb';
export default async function handler(req, res) {
    debugger

    await connectToDatabase();
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { title, content, author } = req.body;
        const newPost = new BlogPost({ title, content, author });
        const savedPost = await newPost.save()
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
}
