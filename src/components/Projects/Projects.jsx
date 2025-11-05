import React, { useRef, useState, useEffect } from 'react';
import './Projects.css';
import CircleButton from '../tools/CircleButton/CircleButton';
import Social from '../Social/Social';
import SplitText from '../tools/TextEffect/TextEffect';

const Projects = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, updated: false });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const [previewStyle, setPreviewStyle] = useState({
    left: 0,
    top: 0,
    translateX: 0,
    opacity: 0,
  });

  // console.log(hoveredIndex);
  // console.log(sectionRef);
  // console.log(rafRef);

  // رجّح تحط روابط الصور هنا
  const projects = [
    {
      number: '01',
      title: "PREM'S PORTFOLIO",
      subtitle: 'Frontend Design, UI Development',
      // استبدل ده بالرابط بتاع الصورة عندك
      image: '/src/assets/Images/chefs-2.jpg',
      description: 'Developed a personal portfolio website for Prem...',
      details: 'Technologies used: React, CSS, HTML...',
    },
    {
      number: '02',
      title: 'TWO GOOD CO.',
      subtitle: 'Frontend Design, UI Development',
      image: '/src/assets/Images/my-photo.jpg',
      description: 'A recreation of the Two Good Co. e-commerce website...',
      details: 'Two Good Co. operates on a "buy one, gift one" model...',
    },
    {
      number: '03',
      title: "PREM'S PORTFOLIO",
      subtitle: 'Frontend Design, UI Development',
      // استبدل ده بالرابط بتاع الصورة عندك
      image: '/src/assets/Images/chefs-2.jpg',
      description: 'Developed a personal portfolio website for Prem...',
      details: 'Technologies used: React, CSS, HTML...',
    },
     {
      number: '04',
      title: 'TWO GOOD CO.',
      subtitle: 'Frontend Design, UI Development',
      image: '/src/assets/Images/my-photo.jpg',
      description: 'A recreation of the Two Good Co. e-commerce website...',
      details: 'Two Good Co. operates on a "buy one, gift one" model...',
    },
    // ضيف مشاريع أكتر لو عايز
  ];

  // دالة تحديث ستايل الـ preview بس داخل RAF عشان smooth
  function scheduleUpdate() {
    if (rafRef.current) return; // لو فيه واحد شغال نستنى
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const p = pointerRef.current;
      if (!sectionRef.current) return;

      const secRect = sectionRef.current.getBoundingClientRect();

      // احسب موضع الـ preview داخل الـ section
      // هنظهر الصورة بالقرب من الـ mouse (نقص شوية من اليسار علشان ماتغطيش العنوان)
      const previewWidth = 360; // نفس حجم الـ CSS، ممكن تعدّل
      const previewHeight = 240;

      // موضع أساسي حسب الماوس
      let left = p.x - secRect.left + 20; // 20px offset لليمين شوية
      let top = p.y - secRect.top - previewHeight / 12;

      // تأكد إن الصورة مش تطلع برا الـ section على اليمين/الشمال
      const minLeft = 10;
      const maxLeft = secRect.width - previewWidth - 10;
      left = Math.max(minLeft, Math.min(maxLeft, left));

      // حركة يمين-شمال (parallax) محسوبة بالنسبة لموضع الفأرة داخل الـ section
      const relativeX = (p.x - secRect.left) / secRect.width; // 0 .. 1
      const maxTranslate = 60; // أقصى تحريك يمين/شمال بالـ px
      const translateX = (relativeX - 0.5) * maxTranslate * 2; // -max..+max

      // opacity حكينا نستخدم 1 لو ظاهر
      const opacity = visible ? 1 : 0;

      setPreviewStyle({
        left,
        top,
        translateX,
        opacity,
      });
    });
  }

  // handlers
  const handleMouseEnter = (index) => (e) => {
    setHoveredIndex(index);
    setVisible(true);

    // ضبط موضع أولي
    pointerRef.current.x = e.clientX;
    pointerRef.current.y = e.clientY;
    pointerRef.current.updated = true;
    scheduleUpdate();
  };

  const handleMouseMove = (index) => (e) => {
    // نحدّث المعلومات بس في الـ ref عشان ماتعملش re-render على كل حدث
    pointerRef.current.x = e.clientX;
    pointerRef.current.y = e.clientY;
    pointerRef.current.updated = true;
    scheduleUpdate();
  };

  const handleMouseLeave = () => {
    // Hide the preview and clear hovered index after a short delay so the
    // opacity transition can run smoothly. Avoid direct DOM mutations.
    setVisible(false);
    setPreviewStyle(prev => ({ ...prev, opacity: 0 }));
    // نعمل تأخير خفيف لـ إلغاء hoveredIndex علشان animation يبقى سلس
    setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };

  // نظافة عند unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
    <hr />
    
  <section className="projects-section" ref={sectionRef} onMouseLeave={handleMouseLeave}>
      <div className="header-row">
        <div className="left-column">
          <p>Featured</p>

          {/* <h2 className="section-title">PROJECTS</h2> */}
           <SplitText
          text={"PROJECTS"}
          tag="h2"
          className="section-title"
          delay={40}
          duration={0.7}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
    
          {/* <p className="description">
            Please explore my selected projects below.<br />
            Click on each one for an overview.
          </p> */}

            <SplitText
          text={"Please explore my selected projects below."}
          tag="p"
          className="description"
          delay={40}
          duration={0.7}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <br />

        <SplitText
          text={"Click on each one for an overview."}
          tag="p"
          className="description"
          delay={40}
          duration={0.7}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />


        </div>
        <div className='right-column'>
        <CircleButton
        one = 'ALL'
        two = 'PROJECTS'
        />
        </div>
      </div>
             <hr />
      <div className="projects-list">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-item"
            onClick={() => {}}
            onMouseEnter={handleMouseEnter(index)}
            onMouseMove={handleMouseMove(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="project-header">
              <span className="project-number">{project.number}</span>
              <h2 className="project-title">{project.title}</h2>
            </div>
            <p className="project-subtitle">{project.subtitle}</p>

            {/* لو عايز تفتح تفاصيل عند الكليك ممكن تستخدم نفس الحالة اللي عندك */}
          </div>
        ))}
      </div>

      {/* الـ preview اللي بيتحرك وبيظهر عند الهوفير */}
      <div
        className="project-preview"
        style={{
          left: previewStyle.left,
          top: previewStyle.top,
          opacity: previewStyle.opacity,
          transform: `translateX(${previewStyle.translateX}px) translateY(-50%)`,
          // الخلفية هتجِب حسب hoveredIndex، لو مفيش هتكون شفافة
          backgroundImage:
            hoveredIndex != null && projects[hoveredIndex].image
              ? `url(${projects[hoveredIndex].image})`
              : 'none',
        }}
        aria-hidden
      />
    </section>
    </>
  );
};

export default Projects;
