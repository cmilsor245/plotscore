import '/styles/components/common/main-action-buttons.css'

export function MainActionButton({ icon: Icon, handleClick }) {
  return (
    <>
      <button
        className = 'main-action-button'
        onClick = { handleClick }
      >
        <Icon className = 'main-action-button--icon' stroke = { 2 } />
      </button>
    </>
  )
}

export function CircleFlagsUk(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><mask id="IconifyId18f38db9476f4aec71"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#IconifyId18f38db9476f4aec71)"><path fill="#eee" d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z"/><path fill="#0052b4" d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"/><path fill="#d80027" d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z"/></g></svg>
  )
}

export function CircleFlagsEs(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><mask id="IconifyId18f38d1483e9ab3263"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#IconifyId18f38d1483e9ab3263)"><path fill="#ffda44" d="m0 128l256-32l256 32v256l-256 32L0 384Z"/><path fill="#d80027" d="M0 0h512v128H0zm0 384h512v128H0z"/><g fill="#eee"><path d="M144 304h-16v-80h16zm128 0h16v-80h-16z"/><ellipse cx="208" cy="296" rx="48" ry="32"/></g><g fill="#d80027"><rect width="16" height="24" x="128" y="192" rx="8"/><rect width="16" height="24" x="272" y="192" rx="8"/><path d="M208 272v24a24 24 0 0 0 24 24a24 24 0 0 0 24-24v-24h-24z"/></g><rect width="32" height="16" x="120" y="208" fill="#ff9811" ry="8"/><rect width="32" height="16" x="264" y="208" fill="#ff9811" ry="8"/><rect width="32" height="16" x="120" y="304" fill="#ff9811" rx="8"/><rect width="32" height="16" x="264" y="304" fill="#ff9811" rx="8"/><path fill="#ff9811" d="M160 272v24c0 8 4 14 9 19l5-6l5 10a21 21 0 0 0 10 0l5-10l5 6c6-5 9-11 9-19v-24h-9l-5 8l-5-8h-10l-5 8l-5-8z"/><path fill="#d80027" d="M122 248a4 4 0 0 0-4 4a4 4 0 0 0 4 4h172a4 4 0 0 0 4-4a4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4a4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4a4 4 0 0 0-4-4z"/><path fill="#eee" d="M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4a16 16 0 0 0 17 4a16 16 0 1 0 10-20a16 16 0 0 0-27-5c-3-4-7-6-12-6m0 8c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-8c0-4 4-8 8-8m24 0c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-8c0-4 4-8 8-8m-44 10l4 1l4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8m64 0c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-7l4-8z"/><path fill="none" d="M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z"/><path fill="#ff9811" d="M200 160h16v32h-16z"/><path fill="#eee" d="M208 224h48v48h-48z"/><path fill="#d80027" d="m248 208l-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24m-88 16h48v48h-48z"/><rect width="20" height="32" x="222" y="232" fill="#d80027" rx="10" ry="10"/><path fill="#ff9811" d="M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z"/><g fill="#ffda44"><circle cx="186" cy="202" r="6"/><circle cx="208" cy="202" r="6"/><circle cx="230" cy="202" r="6"/></g><path fill="#d80027" d="M169 272v43a24 24 0 0 0 10 4v-47zm20 0v47a24 24 0 0 0 10-4v-43z"/><g fill="#338af3"><circle cx="208" cy="272" r="16"/><rect width="32" height="16" x="264" y="320" ry="8"/><rect width="32" height="16" x="120" y="320" ry="8"/></g></g></svg>
  )
}
