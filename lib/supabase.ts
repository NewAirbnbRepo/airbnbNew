import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vguhsejvmsiaczfththm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndWhzZWp2bXNpYWN6ZnRodGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MTYyMzYsImV4cCI6MjAzMjk5MjIzNn0.spzFDbVpphcQqPeHLIElAXcEVUecXrtIZWrUMc2eDik"

//const supabaseUrl = "https://boqirzictrusbazeztzb.supabase.co"
//const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWlyemljdHJ1c2JhemV6dHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NTIxMDMsImV4cCI6MjAzMjIyODEwM30.OZopNFf1RCrpiIqlXtZ7fTvqHvy_EcSrtgyukSmHP2s"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})