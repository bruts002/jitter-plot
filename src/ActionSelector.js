import React from "react"
import CircleButton from "./inputs/CircleButton/CircleButton"

export const USER_ACTIONS = {
  VIEW_SAVED: "viewSaved",
  VIEW_DETAILS: "viewDetails",
  ADD_PLOT: "addPlot",
  FILTER_DATA: "filterData"
}

export default function ActionSelector({ action, setAction }) {
  return (
    <div className='actionSelector'>
      <CircleButton
        onClick={() => setAction(USER_ACTIONS.FILTER_DATA)}
        isActive={action === USER_ACTIONS.FILTER_DATA}
        fontIcon='filter'
      />
      <CircleButton
        onClick={() => setAction(USER_ACTIONS.VIEW_SAVED)}
        isActive={action === USER_ACTIONS.VIEW_SAVED}
        fontIcon='floppy-o'
      />
      <CircleButton
        onClick={() => setAction(USER_ACTIONS.VIEW_DETAILS)}
        isActive={action === USER_ACTIONS.VIEW_DETAILS}
        fontIcon='id-card'
      />
      <CircleButton
        onClick={() => setAction(USER_ACTIONS.ADD_PLOT)}
        isActive={action === USER_ACTIONS.ADD_PLOT}
        fontIcon='plus'
      />
    </div>
  )
}
