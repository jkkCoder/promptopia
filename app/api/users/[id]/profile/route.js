import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt";
import User from "@models/user"

export const GET = async (req,{params}) => {
    try {
        await connectToDb();

        const prompts = await Prompt.find({
            creator: params.id
        }).lean().populate('creator', ['username', 'image'])

        let user
        if(prompts?.length === 0){
            user = await User.findById(params.id, {username: 1}).lean();
        }

        const response = {
            prompts,
            userName : prompts?.[0]?.creator.username || user?.username
        }

        return new Response(JSON.stringify(response), {
            status: 200
        })
    } catch(err) {
        return new Response('Failed to fetch all prompts', {
            status: 500
        })
    }
}