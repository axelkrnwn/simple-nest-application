import { createClient } from '@supabase/supabase-js'
import { decode } from "base64-arraybuffer";

const supabaseUrl = process.env.SUPABASE_API_URL as string
const supabaseKey = process.env.SUPABASE_ANON_KEY as string

const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadFile(folder: string, file: Express.Multer.File): Promise<string> {
    
    const fileBase64 = decode(file.buffer.toString("base64"));
    const { error } = await supabase.storage
    .from("storage-bucket")
    .upload(`${folder}/${file.originalname}`, fileBase64, {
        contentType: file.mimetype,
        upsert: false,
    });

    if (error) {
        console.log(error)
    throw error;
    }
    return getPublicUrl(folder, file.originalname);
}

export async function getPublicUrl(folder: string, fileName: string): Promise<string> {
      const { data } = supabase.storage
        .from(process.env.STORAGE_BUCKET as string)
        .getPublicUrl(`${folder}/${fileName}`);
      return data.publicUrl;
    }


