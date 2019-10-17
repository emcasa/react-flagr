export default function FlagrCase({children, value}) {
  if (typeof children === 'function') return children(value)
  else return children
}
