export default function Live2d() {
  const styles = {
    position: "fixed" as "fixed",
    bottom: "-25%",
    left: 0,
    zIndex: 1000,
    maxWidth: "300px",
    width: "40%",
    height: "70%",
    overflow: "hidden",
    border: "none",
    backgroundColor: "transparent",
  }
  return <>
    <iframe src="/live2d.html" style={styles}></iframe>
  </>;
}
