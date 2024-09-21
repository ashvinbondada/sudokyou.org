type Props = {
    params: {
        difficulty: string
    }
}

export default function Difficultypage({params: {difficulty}}: Props) {
  return (
    <div>
        sudoku level: {difficulty}
    </div>
  )
}
