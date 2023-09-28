import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from '@/app/page'
import Profile from '@/app/client/profile/[id]/page'
import ExplorePage from '@/app/explore/page'
import Project from '@/app/client/project/page'
import SearchPage from '@/app/client/search/page'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route Component={Home} path="/" />
      <Route Component={ExplorePage} path="/explore" />
      <Route Component={Project} path="/projects" />
      <Route Component={SearchPage} path="/" />
      <Route Component={Profile} path="/" />
    </BrowserRouter>
  )
}

export default Routes
