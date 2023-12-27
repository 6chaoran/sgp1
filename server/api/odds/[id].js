import { createClient } from '@supabase/supabase-js'
export default defineEventHandler(async(event) => {
    const id = getRouterParam(event, 'id')
    const config = useRuntimeConfig(event);
    const url = config.public.supabaseUrl
    const key = config.public.supabaseKey  
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('odds')
      .select('school_id, year, phase, applied, vacancy, ballot, odds')
      .eq('school_id', id)
    return data
})