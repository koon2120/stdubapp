import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const { data, error } = await supabase
    .from("projects-request")
    .select()
    .order("id", { ascending: true });
  if (error) {
    return error;
  } else {
    return data;
  }
});
