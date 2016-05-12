# Base image 
FROM httpd:2.4

MAINTAINER jeremy.pumphrey@nih.gov

RUN mkdir -p /usr/local/apache2/match

#COPY dist/ /usr/local/apache2/htdocs/
ADD httpd.conf /usr/local/apache2/conf/
ADD  nci-match-ui.tgz /usr/local/apache2/match/
#RUN tar -xvf /usr/local/apache2/match/nci-match-ui.tgz
RUN mv /usr/local/apache2/match/bower_components/ /usr/local/apache2/match/app/

CMD httpd-foreground -C 'DocumentRoot /usr/local/apache2/match/app/'
