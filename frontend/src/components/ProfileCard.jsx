import swiftLogo from "../assests/swift_logo.png";
export default function ProfileCard() {
	return (
		<div className="h-fit w-fit border-2 border-black m-auto relative rounded overflow-hidden">
			<div className="h-20 w-20  border-black bg-red-500 -mb-10"></div>
			<img src={swiftLogo} alt="Profile" className="h-10 w-10 border-2 border-black rounded-full overflow-hidden absolute left-5 top-5"/>
			<div className="h-20 w-20  border-t-2 bg-black"></div>
		</div>
	);
}
