import { ReactNode, useEffect } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {

  // 백그라운드에서 스크롤 안되게
  // 원래 있던 body 스타일이 없어져서 cssText 대신 하드코딩함 나중에 append나 class로 수정
  useEffect(() => {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.overflowY = "scroll";
    document.body.style.width = "100%";

    // document.body.style.cssText = `
    //   position: fixed; 
    //   top: -${window.scrollY}px;
    //   overflow-y: scroll;
    //   width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      // document.body.style.cssText = '';
      document.body.style.position = "";
      document.body.style.top = ``;
      document.body.style.overflowY = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const el = document.getElementById('modal-root') as HTMLElement;

  return ReactDom.createPortal(children, el);
};

export default ModalPortal;