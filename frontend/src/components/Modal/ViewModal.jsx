import "./ViewModal.css";
export default function ViewModal({ toggleDialog, children }) {
	return (
		<dialog ref={toggleDialog} className="m-auto h-fit w-fit">
			<div className="content">{children}</div>
		</dialog>
	);
}
