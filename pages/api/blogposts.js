// import BlogPost from '../../models/blogPost';
import BlogPost from '../../model/blogPost';
// import connectToDatabase from '../../utils/mongodb';
import connectToDatabase from '@/utils/mongodb';

export default async function handler(req, res) {
    const { method } = req;

    try {
        const { db } = await connectToDatabase();


        switch (method) {
            // case 'POST':
            //     try {
            //         const { title, content, author } = req.body;
            //         const newPost = new BlogPost({ title, content, author });
            //         const savedPost = await newPost.save();
            //         res.status(201).json(savedPost);
            //     } catch (error) {
            //         res.status(500).json({ error: error.message });
            //     }
            //     break;
            // case 'GET':
            //     try {
            //         const blogPosts = await BlogPost.find();
            //         res.status(200).json(blogPosts);
            //     } catch (error) {
            //         res.status(500).json({ error: error.message });
            //     }
            //     break;
            case 'PUT':
                try {
                    const { id } = req.query;
                    const { title, content, author } = req.body;
                    const updatedPost = await BlogPost.findByIdAndUpdate(
                        id,
                        { title, content, author },
                        { new: true }
                    );
                    res.status(200).json(updatedPost);
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
                break;
            case 'DELETE':
                try {
                    const { id } = req.query;
                    const deletedPost = await BlogPost.findByIdAndDelete(id);
                    res.status(200).json(deletedPost);
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
