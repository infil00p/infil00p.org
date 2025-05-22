import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <div className="relative w-8 h-8 mr-3">
        <Image
          src={picture}
          fill
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-base font-medium">{name}</div>
    </div>
  )
}

export default Avatar