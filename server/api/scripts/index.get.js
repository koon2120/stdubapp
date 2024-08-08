import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  if (getQuery(event).id == undefined) {
    const { data, error } = await supabase
      .from("scripts")
      .select("id,title,image,user_id,created_at")
      .order("id", { ascending: true });
    if (error) {
      return error;
    } else {
      return data;
    }
  } else {
    const { data, error } = await supabase
      .from("scripts")
      .select()
      .eq("id", getQuery(event).id);
    if (error) {
      return error;
    } else {
      if (data.length == 0) {
        return {
          status: 404,
          data: data,
        };
      } else {
        return {
          status: 200,
          data: data,
        };
      }
    }
  }
});
