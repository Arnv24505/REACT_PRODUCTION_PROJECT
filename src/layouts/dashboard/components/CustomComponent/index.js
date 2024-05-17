import { Card, CardContent, Typography } from '@mui/material'
import MDBox from 'components/MDBox'
import React from 'react'
import { cardData, handleLayout } from '../../data/CardData'
import CardGroupHolder from '../CardGroupHoder'

export default () => (
  <Card>
    <MDBox
      backgroundColor='white'
      height='90vh'
      m={5}>
      <CardGroupHolder cardData={cardData} handleLayout={handleLayout}>
        <CardContent id={2}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Word of the Day Three
          </Typography>
          <Typography variant='h5' component='div'>
            `be bull nev bull o bull lent`
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            adjective
          </Typography>
          <Typography variant='body2'>
            well meaning and kindly.
            <br />
            {'a benevolent smile'}
          </Typography>
        </CardContent>
        <CardContent id={0}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Wordasdasdasdasd
          </Typography>
          <Typography variant='h5' component='div'>
            `be bull nev bull o bull lent`
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            adjective
          </Typography>
          <Typography variant='body2'>
            well meaning and kindly.
            <br />
            {'a benevolent smile'}
          </Typography>
        </CardContent>
        <CardContent id={10}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Word of the Day Two
          </Typography>
          <Typography variant='h5' component='div'>
            `be bull nev bull o bull lent`
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            adjective
          </Typography>
          <Typography variant='body2'>
            well meaning and kindly.
            <br />
            {'a benevolent smile'}
          </Typography>
        </CardContent>
      </CardGroupHolder>
    </MDBox>
  </Card>
)
