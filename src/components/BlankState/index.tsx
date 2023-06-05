import { Button } from '@/components/ui/button'

type Props = {
  text: string
  actionText: string
  onActionClick: () => void
}

const BlankState = ({ text, actionText, onActionClick }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <span className="text-md font-light text-zinc-600">{text}</span>
        <Button variant="link" onClick={onActionClick}>
          {actionText}
        </Button>
      </div>
    </div>
  )
}

export default BlankState
