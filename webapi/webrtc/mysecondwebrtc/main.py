#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import random
import os
import jinja2
from google.appengine.api import channel

jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

def generate_random(len):
  word = ''
  for i in range(len):
    word += random.choice('0123456789')
  return word

def create_channel(client_id):
  return channel.create_channel(client_id, 30)

class SendDataClientPage(webapp2.RequestHandler):

  def post(self):
    remote_id = self.request.get('remoteClientId')
    data = self.request.body
    channel.send_message(remote_id, data)

class MainPage(webapp2.RequestHandler):

  def get(self):
    client_id = generate_random(10)
    token = create_channel(client_id);
    template = jinja_environment.get_template('index.html')
    self.response.out.write(template.render({
      'token': token,
      'client_id': client_id
    }))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/send', SendDataClientPage)
], debug=True)
