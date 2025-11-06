import CircleButton from '../tools/CircleButton/CircleButton';
import SplitText from '../tools/TextEffect/TextEffect';
import TextOpacity from '../tools/TextOpacity/TextOpacity';
import './LetIsWork.css'

function  LetIsWork() {

    const text = "Feeling good about a new project? Write me what's in your mind and let's talk about it!";

  return (
    <div className="let-is-work">

        <div className="left-work">


         <SplitText
          text={"Contact"}
          tag="p"
          className="small"
          delay={40}
          duration={0.1}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

      
         <SplitText
          text={"LET’S WORK"}
          tag="h2"
          className=""
          delay={40}
          duration={0.3}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
         
         <SplitText
          text={"TOGETHER"}
          tag="h2"
          className=""
          delay={40}
          duration={0.3}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

        </div>

        <div className="right-work">
            <CircleButton
            one={'LET’S'}
            two={'Contact'}
            />

            <TextOpacity
              text={text}
              minOpacity={0.3}
              maxOpacity={1}
              className="text-work"
              
            />

        </div>

    </div>
  );
}
export default LetIsWork;