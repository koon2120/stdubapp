import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  return await supabase.storage
    .from("user-input")
    .list(user.id, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });
});
