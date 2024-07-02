
type Props = {
    name: string
    picture: string
  }

  const AboutInfo = ({ name, picture }: Props) => {
    return (
      <div className="items-center space-y-5 py-10">
        <img src={picture} className="mr-4" alt={name} />
        <p>Joe is a senior software developer with over a decade of experience specializing in mobile development on Android.  He is most widely known
            for his work on PhoneGap and Apache Cordova, but has recently worked with AI/ML technologies specializing in Local/On Device deployments, has 
            contributed to Tensorflow and has spoken at numerous conferences on the topic, including at PyTorch Conference.  He has also made other
            minor contributions to various open source projects throughout the years.
        </p>
        <p>
            He is attempting to complete the Pacific Crest Trail starting on June 17, 2024.  If he is able to complete this thru-hike, he may
            attempt more.  In the past, he has been associated with numerous causes such as activism related to the state surveillance of 
            indigenous people and enviromental movements, and at one point was considered a Critical Threat to Olympics Infrastructure during the 
            2010 Winter Olympics by the RCMP. Joe has a BSc from the University of Northern British Columbia, and was a cofounder
            and the first Program Director of the CFUR Radio. 
        </p>
        <h3>Joe on Social Media</h3>
        <ul>
          <li><a href="https://www.linkedin.com/in/joe-bowser-17b3397/">LinkedIn</a></li>
          <li><a href="https://instagram.com/infil00p">Instagram</a></li>
        </ul>
      </div>
    )
  }
  
  export default AboutInfo