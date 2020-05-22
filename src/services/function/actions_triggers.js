import api from '../Api'

export async function sendAction(action_type, action_click, action_trigger, payload){
  await api.post("/me/action-tracer", {
    action_type,
    action_click,
    action_trigger,
    payload
  })
}
