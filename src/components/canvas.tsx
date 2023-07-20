import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
    videoRef: React.RefObject<HTMLVideoElement>;
}

interface TextPosition {
    text: string;
    x: number;
    y: number;
}

const Canvas: React.FC<CanvasProps> = ({videoRef}) =>{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if(canvas && video){
            const ctx = canvas.getContext('2d');
            let animationFrameId: number;

            const drawText = (textPositions: TextPosition[]) =>{
                if(ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.font = '24px Arial';
                    ctx.fillStyle = 'yellow';
                    
                    textPositions.forEach((textPosition) =>{
                        ctx.fillText(textPosition.text, textPosition.x, textPosition.y);
                    });
                }
            };

            const updateCanvasSize = () => {
                canvas.width = video.offsetWidth;
                canvas.height = video.offsetHeight;
            };

            const handleTimeUpdate = () =>{
                const currentTime = video.currentTime;
                

                let textPositions: TextPosition[] = [];
                // const updatedTextPositions: TextPosition[] = [
                //     { text: 'リンゴ', x: 10, y: 50},
                //     { text: 'バナナ', x: 100, y: 100},
                //     { text: 'オレンジ', x: 200, y: 150 }, 
                // ]

                if(currentTime >= 1 && currentTime < 5){
                    textPositions = [{ text: '富士ソフト様', x: 130, y: 150},{ text: '本日は、カローラ大分店にご来店いただき\nありがとうございます。', x: 130, y: 200},{ text: 'ありがとうございます。', x: 130, y: 250}];
                } else if(currentTime >= 5 && currentTime < 10){
                    textPositions = [{ text: '点検作業の完了まで少しお時間を要しますので、', x: 150, y: 150},{ text: 'その間富士ソフト様に最適なご提案をさせていただけ', x: 150, y: 200},{ text: 'ればと思います。', x: 150, y: 250}];
                } else if(currentTime >= 10 && currentTime < 15) {
                    textPositions = [{ text: '現在のお車の状態を見ていきましょう', x: 200 , y: 200}];
                } else {
                    textPositions = [{ text: '', x: 200 , y: 200}];
                }

                drawText(textPositions);
            };

            const animate = () =>{
                handleTimeUpdate();
                animationFrameId = requestAnimationFrame(animate);
            };

            const startAnimation = () => {
                if(!isPlaying){
                    setIsPlaying(true);
                    animate();
                }
            };

            const stopAnimation = () => { 
                if(isPlaying) { 
                    setIsPlaying(false)
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = 0;
                }
            }

            video.addEventListener('play', () =>{
                updateCanvasSize();
                startAnimation();
            });

            video.addEventListener('pause', stopAnimation);
            video.addEventListener('ended', stopAnimation);

            window.addEventListener('resize', updateCanvasSize);

            return () => {
                video.removeEventListener('play', stopAnimation);
                video.removeEventListener('pause', stopAnimation);
                video.removeEventListener('ended', stopAnimation);
                window.removeEventListener('resize', updateCanvasSize);
                stopAnimation();
            };
        }
    }, [canvasRef, videoRef, isPlaying]);
    
    return <canvas ref={canvasRef} style={{position: 'absolute', top:0, left: 0}} />
};

export default Canvas;