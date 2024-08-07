import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", getQuery(event).id);
  if (error) {
    return error;
  } else {
    return data;
  }
});
