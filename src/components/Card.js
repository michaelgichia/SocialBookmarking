import React from 'react'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'

export default (props) => (
  <Card expanded={props.expanded} onExpandChange={props.onExpandChange}>
    <CardHeader
      title={props.title}
      avatar={props.avatar}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardTitle subtitle={props.subtitle} expandable={true} />
    <CardText expandable={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardText>
      <Toggle
        toggled={props.expanded}
        onToggle={props.onToggle}
        labelPosition="right"
        label="More"
      />
    </CardText>
  </Card>
)
