import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const { data, error } = await supabase
    .from("projects-request")
    .insert({
      title: getQuery(event).title,
      description: getQuery(event).description,
      user_id: user.id,
    });
  if (error) {
    return error;
  } else {
    return data;
  }
});
