/*
[에러 공통 사항]
- 기능이 제대로 처리되지 않은 경우 반환하는 에러 메시지의 공통 예외처리 내용입니다.
*/
export function onResponse(err) {
  const errMsg = err.response.data.message;
  alert(`오류가 발생하였습니다. 관리자에게 문의해주세요.\n\n${errMsg}`);
}

export function onContractCall() {
  alert('컨트랙트 호출에 실패하였습니다.');
}

export function onInvalidAddress() {
  alert('유효한 주소를 입력해주세요.');
}
