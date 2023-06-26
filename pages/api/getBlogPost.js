import BlogPost from "@/model/blogPost";
import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const blogPosts = await BlogPost.find();
            res.status(200).json(blogPosts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}