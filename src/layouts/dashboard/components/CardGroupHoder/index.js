import React, { useEffect, useState } from 'react'
import Responsive from 'react-grid-layout'
import _ from 'lodash'
import { Button, Card } from '@mui/material'

const CardGroupHolder = ({ cardData, children, handleLayout }) => {
  const [compactType] = useState('vertical')
  let [cardsData, setCardsData] = useState()
  const [layouts, setLayouts] = useState()
  let latestCoord

  useEffect(() => {
    const { headersContent } = cardData
    setCardsData(headersContent)
  }, [])

  const ResponsiveReactGridLayout = Responsive
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
  const cols = { lg: 12, md: 12, sm: 12, xs: 2, xxs: 1 }

  useEffect(() => {
    const layout = cardsData !== undefined ?
      _.map(cardsData, function(item, i) {
        return {
          x: cardsData[i].x,
          y: cardsData[i].y,
          w: cardsData[i].width,
          h: cardsData[i].height,
          i: i.toString(),
        }
      }) : []
    setLayouts({ lg: layout })

  }, [cardsData])

  const onLayoutChange = (layout, layouts) => {
    if(!layouts) {
      console.error('Layouts is undefined')
      return
    }

    const { lg } = layouts

    if(_.isEmpty(lg)) {
      console.log('Layouts is Empty')
      return
    }

    if(lg.length === cardsData?.length) {
      latestCoord = cardsData?.map((card, index) => {
        return {
          id: card.id,
          headerContent: card.headerContent,
          status: card.status,
          height: lg[index].h,
          width: lg[index].w,
          x: lg[index].x,
          y: lg[index].y,
        }
      })
    }
  }


  return (
    <>
      { handleLayout &&
        <Button data-testid='save-layout' variant='outlined' onClick={ () => handleLayout(latestCoord) }>Save
          Layout</Button> }
      <ResponsiveReactGridLayout
        layouts={ layouts }
        compactType={ compactType }
        preventCollision={ !compactType }
        breakpoints={ breakpoints }
        cols={ cols }
        onLayoutChange={ onLayoutChange }
        isDroppable
      >
        { !_.isEmpty(cardsData) &&
          _.filter(children, childId => {
            return _.find(cardsData, (cardId) => childId.props.id === cardId.id)
          })?.map((child) => {
            const { props } = child
            return (
              <Card data-testid='card-data' sx={ { m: 1 } } key={ props.id }>
                { child }
              </Card>
            )
          })
        }
      </ResponsiveReactGridLayout>
    </>
  )
}

export default CardGroupHolder