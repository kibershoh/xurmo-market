import { motion } from "framer-motion";
function MotionText(props) {
  const { logo, classes } = props
  const text = logo.split(" ");
  return (
    <>
      {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: i / 18
          }}
          key={i}
          className={classes}
        >
          {el}{" "}
        </motion.span>
      ))}
    </>
  );
}

export default MotionText;