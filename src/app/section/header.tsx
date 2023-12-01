import { Button } from "../component/Button";

const Header = () => {
  return (
    <div className=" p-6 flex justify-end gap-x-4">
      <Button
        label="Login"
        type="primary" />
      <Button
        label="Register"
        type="secondary" />
    </div>
  )
}

export default Header;