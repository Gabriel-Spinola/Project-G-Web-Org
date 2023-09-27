import styles from './exploreHighlights.module.scss'
export default function ExploreHighlight() {
  return (
    <section className="bg-darker-white min-w-full flex flex-wrap items-center">
      <section className={styles.highlightsContainer}>
        <div id="div1" className={styles.projectContainer}></div>
        <div id="div2" className={styles.projectContainer}></div>
        <div id="div3" className={styles.projectContainer}></div>
        <div id="div4" className={styles.projectContainer}></div>
        <div id="div5" className={styles.projectContainer}></div>
        <div id="div6" className={styles.projectContainer}></div>
        <div id="div7" className={styles.projectContainer}></div>
        <div id="div8" className={styles.projectContainer}></div>
      </section>
    </section>
  )
}
