import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import GridLayout from "react-grid-layout";

export default function GridComponent() {
     // layout is an array of objects, see the demo for more complete usage
     const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2},
        { i: "b", x: 0, y: 2, w: 1, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 0, y: 0, w: 1, h: 2 }
      ];
    return (
        <GridLayout
          className="border-4 w-[30%] "
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          <div className="bg-lime-100" key="a">Tache 1</div>
          <div className="bg-lime-100" key="b">Tache 2</div>
          <div className="bg-lime-100" key="c">Tache 3</div>
        </GridLayout>
      );
};
