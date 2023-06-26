import BlogPost from "@/model/blogPost";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
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
    }
}