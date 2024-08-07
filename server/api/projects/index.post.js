import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const reqBody = await readBody(event)
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title:reqBody.title,
      description:reqBody.description,
      image:reqBody.image,
      members:reqBody.members,
      user_id:user.id
    })
  if (error) {
    return error;
  } else {
    return data;
  }
});
