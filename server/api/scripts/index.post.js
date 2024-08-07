import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const reqBody = await readBody(event)
  const { data, error } = await supabase
    .from("scripts")
    .insert({
      title:reqBody.title,
      image:reqBody.image,
      youtube_video: reqBody.youtube_video,
      character: reqBody.character,
      scripts: reqBody.scripts,
      user_id:user.id
    })
  if (error) {
    return error;
  } else {
    return data;
  }
});
