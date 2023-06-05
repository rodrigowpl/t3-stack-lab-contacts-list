import { Loader2 } from 'lucide-react'

type Props = {
  text?: string
}

const Loading = ({ text = 'Loading...' }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-md font-light text-zinc-600">{text}</span>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    </div>
  )
}

export default Loading
