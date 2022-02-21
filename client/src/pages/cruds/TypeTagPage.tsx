import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {fetchTagTypes} from "../../http/tagTypeAPI";

const TypeTagPage = () => {
  const {pathname} = useLocation()
  const id = pathname.slice(pathname.lastIndexOf('/')+1)

  useEffect(() => {
    fetchTagTypes(`_id=${id}`).then(data => console.log(data.docs))
  }, [])


  return (
    <div>
      TypeTag
    </div>
  );
};

export default TypeTagPage;