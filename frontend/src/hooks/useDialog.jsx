export default function useDialog(dialogRef) {
    const toggleDialog = () => {
		if (!dialogRef.current) return;
		dialogRef.current.hasAttribute("open")
			? dialogRef.current.close()
			: dialogRef.current.showModal();
    }
    return toggleDialog
}
