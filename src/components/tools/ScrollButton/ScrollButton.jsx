import './ScrollButton.css'

function ScrollButton() {
    return (


        <>
        
        <div className="circle-btn-wrap">
  <button className="big-btn">
    
<svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19V5m0 14-4-4m4 4 4-4"/>
</svg>

  </button>

  <svg className="circular-text" viewBox="0 0 220 220" aria-hidden="true">
    <defs>
      <path id="cPath" d="M110,110 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"/>
    </defs>

    <text >
      <textPath href="#cPath" fill='white' startOffset="50%" textAnchor="middle">
        • SCROLL TO EXPLORE • SCROLL TO EXPLORE •
      </textPath>
    </text>

  </svg>
</div>

<style>

</style>

        
        </>



    )}
export default ScrollButton;