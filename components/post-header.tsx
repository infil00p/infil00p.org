import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <PostTitle>{title}</PostTitle>
      <div className="flex items-center mb-6 text-forest-600">
        <Avatar name={author.name} picture={author.picture} />
        <span className="mx-2">•</span>
        <DateFormatter dateString={date} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    </div>
  )
}

export default PostHeader