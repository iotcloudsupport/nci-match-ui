# Base image 
FROM httpd:2.4

MAINTAINER jeremy.pumphrey@nih.gov

RUN mkdir -p /usr/local/apache2/match

#COPY dist/ /usr/local/apache2/htdocs/
ADD envconfig/httpd.conf /usr/local/apache2/conf/
ADD  nci-match-ui.tgz /usr/local/apache2/match/
#ADD login_config.js.test /usr/local/apache2/match/app/scripts/env/login_config.js
#RUN tar -xvf /usr/local/apache2/match/nci-match-ui.tgz

RUN mv /usr/local/apache2/match/bower_components/ /usr/local/apache2/match/app/

ADD envconfig/setenv.sh /usr/local/apache2/match/
RUN chmod +x /usr/local/apache2/match/setenv.sh
ADD envconfig/login_config.js.* /usr/local/apache2/match/
#RUN ls /usr/local/apache2/match/
#RUN ls /usr/local/apache2/match/app/scripts/env/

#CMD httpd-foreground -C 'DocumentRoot /usr/local/apache2/match/app/'
CMD /usr/local/apache2/match/setenv.sh && sleep 3 && httpd-foreground -C 'DocumentRoot /usr/local/apache2/match/app/'
#CMD cp /usr/local/apache2/match/login_config.js.dev /usr/local/apache2/match/app/scripts/env/login_config.js && sleep 3 && httpd-foreground -C 'DocumentRoot /usr/local/apache2/match/app/'
