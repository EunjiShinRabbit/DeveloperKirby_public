import {useState, useEffect} from 'react';


const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    },[]);


    useEffect(() => {
            if(!isFetching) return;
            callback(() => {
                console.log('Call Back!');
            })
    },[isFetching])



    const handleScroll = () => {
        
       if (((document.documentElement.scrollTop + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) && isFetching === false){
        setIsFetching(true);
       }else{
        return;
       }
      
    }


    return [isFetching, setIsFetching];


}

export default useInfiniteScroll;