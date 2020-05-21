import api from '../Api'

export async function sendAction(action_type, action_click, action_trigger){
  await api.post("/me/action", {
    action_type: "set-new-playlist",
    action_click: "home-card-grid",
    action_trigger: "user",
  })
}

export function actionTrigger(action_type, action_click, action_trigger){

  await sendAction(action_type, action_click, action_trigger)

}