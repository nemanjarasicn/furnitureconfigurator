export interface Order {
  num_of_basins: 0 | 1; //0 Einzelnes Waschbecken aus Keramik | 1 ZWei Waschbecken nebeneinander
  sink_type: 0 | 1; //0 Aufsatzwaschbecken werden direkt in den Möbelkorpus hinein gelegt. | 1 Definieren Sie die Maße Ihres Waschbeckens selbst.
  sink_dimensions_width?: number;
  sink_dimensions_height?: number;
  sink_model: string;
  width: number;
  height: number;
  depth: number;
  color_consists_id: number;
  color_consists_name: string;
  color_front_id: number;
  color_front_name: string;
  color_cover_plate_id: number;
  color_cover_plate_name: string;
}
