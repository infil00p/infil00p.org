import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const AboutInfo = ({ name, picture }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-forest-100 rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden shrink-0">
            <Image 
              src={picture} 
              alt={name}
              width={192}
              height={192}
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-forest-800 mb-4">{name}</h1>
            <div className="prose text-forest-700 space-y-6">
              <p>
                Joe is a staff level software developer with over a decade of experience specializing in mobile development on Android. He is most widely known
                for his work on PhoneGap and Apache Cordova, but has recently worked with AI/ML technologies specializing in Local/On Device deployments, has 
                contributed to Tensorflow and has spoken at numerous conferences on the topic, including at PyTorch Conference.
              </p>
              <p>
                He attempted a south-bound thru-hike of the Pacific Crest Trail in 2024, but had to abandon the attempt due to numerous injuries. In the past, 
                he has been associated with numerous causes such as activism related to the state surveillance of indigenous people and environmental movements, 
                and at one point was considered a Critical Threat to Olympics Infrastructure during the 2010 Winter Olympics by the RCMP.
              </p>
              <p>
                Joe has a BSc from the University of Northern British Columbia, and was a cofounder and the first Program Director of CFUR Radio.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-forest-100 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-forest-800 mb-6">Connect with Joe</h2>
        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/joe-bowser-17b3397/" 
            className="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            href="https://instagram.com/infil00p" 
            className="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutInfo